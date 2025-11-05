"use client";

import React, { useState, useRef, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import { Camera, Volume2, Power, RefreshCw } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useSpeak } from '@/hooks/use-speak';
import { convertSignToText } from '@/ai/flows/sign-language-converter';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { AnimatePresence, motion } from 'framer-motion';

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};

export function SignLanguageInterface() {
  const webcamRef = useRef<Webcam>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [convertedText, setConvertedText] = useState<string | null>(null);
  const { speak } = useSpeak();
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const captureInterval = useRef<NodeJS.Timeout | null>(null);

  const captureAndConvert = useCallback(async () => {
    if (isProcessing || !webcamRef.current) return;

    setIsProcessing(true);
    
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) {
        toast({
            variant: "destructive",
            title: "Error",
            description: "Could not capture an image from the camera.",
        });
        setIsProcessing(false);
        return;
    }

    try {
      const result = await convertSignToText({ photoDataUri: imageSrc });
      if (result.text && result.text !== convertedText) {
          setConvertedText(result.text);
          speak(result.text);
      }
    } catch (err) {
      console.error("Error converting sign to text:", err);
      // Only show toast for errors, not if it just can't understand.
    } finally {
      setIsProcessing(false);
    }
  }, [webcamRef, speak, isProcessing, toast, convertedText]);

  useEffect(() => {
    if (isCameraActive && hasCameraPermission) {
        captureInterval.current = setInterval(captureAndConvert, 2000);
    } else {
        if (captureInterval.current) {
            clearInterval(captureInterval.current);
        }
    }

    return () => {
        if (captureInterval.current) {
            clearInterval(captureInterval.current);
        }
    }
  }, [isCameraActive, hasCameraPermission, captureAndConvert]);


  useEffect(() => {
    if (isCameraActive) {
      const getCameraPermission = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          setHasCameraPermission(true);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error('Error accessing camera:', error);
          setHasCameraPermission(false);
          setIsCameraActive(false);
          toast({
            variant: 'destructive',
            title: 'Camera Access Denied',
            description: 'Please enable camera permissions in your browser settings to use this feature.',
          });
        }
      };
      getCameraPermission();
    } else {
         if (videoRef.current && videoRef.current.srcObject) {
            (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
    }
  }, [isCameraActive, toast]);

  useEffect(() => {
    return () => {
      // Ensure camera is turned off on component unmount
      if (videoRef.current && videoRef.current.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
      }
      if (captureInterval.current) {
        clearInterval(captureInterval.current);
      }
    };
  }, []);

  const toggleCamera = () => {
    setIsCameraActive(prev => !prev);
    setConvertedText(null);
    setHasCameraPermission(null);
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Sign Language Converter</CardTitle>
          <CardDescription>
            The model will interpret your gestures in real-time. Position your hand clearly in the frame.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative mb-4 aspect-video w-full overflow-hidden rounded-lg bg-secondary">
            {isCameraActive && hasCameraPermission ? (
                <>
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}
                        className="h-full w-full object-cover"
                    />
                    {isProcessing && (
                        <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-black/50 px-3 py-1.5 text-xs text-white">
                            <RefreshCw className="h-4 w-4 animate-spin" />
                            <span>Identifying...</span>
                        </div>
                    )}
                </>
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center text-muted-foreground">
                <Camera className="mb-4 h-16 w-16" />
                <p>Camera is off</p>
              </div>
            )}
            {hasCameraPermission === false && (
                <Alert variant="destructive" className="mt-4">
                  <AlertTitle>Camera Access Required</AlertTitle>
                  <AlertDescription>
                    Please allow camera access in your browser settings to use this feature.
                  </AlertDescription>
                </Alert>
            )}
          </div>
          <div className="mb-4">
            <Button onClick={toggleCamera} size="lg" className="w-full">
              <Power className="mr-2 h-5 w-5" />
              {isCameraActive ? 'Turn Camera Off' : 'Turn Camera On'}
            </Button>
          </div>
          
          <div className="relative h-24">
             <AnimatePresence mode="wait">
                <motion.div
                    key={convertedText}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="w-full"
                >
                    {convertedText ? (
                        <Alert>
                            <AlertTitle className="flex items-center justify-between">
                                <span>Converted Text</span>
                                <Button variant="ghost" size="icon" onClick={() => speak(convertedText)} aria-label="Read text aloud">
                                    <Volume2 className="h-5 w-5"/>
                                </Button>
                            </AlertTitle>
                            <AlertDescription className="text-2xl font-bold">{convertedText}</AlertDescription>
                        </Alert>
                    ) : (
                        <div className="flex h-full items-center justify-center rounded-lg border border-dashed text-center text-muted-foreground">
                            <p>Translation will appear here</p>
                        </div>
                    )}
                </motion.div>
             </AnimatePresence>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
