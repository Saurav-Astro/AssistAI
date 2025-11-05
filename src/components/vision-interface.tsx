"use client";

import React, { useState, useRef, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import { Camera, RefreshCw, Volume2, Power } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { useSpeak } from '@/hooks/use-speak';
import { identifyObjects } from '@/ai/flows/real-time-object-identification';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "environment"
};

export function VisionInterface() {
  const webcamRef = useRef<Webcam>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [description, setDescription] = useState<string | null>(null);
  const { speak } = useSpeak();
  const { toast } = useToast();
  const captureInterval = useRef<NodeJS.Timeout | null>(null);

  const captureAndIdentify = useCallback(async () => {
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
      const result = await identifyObjects({ photoDataUri: imageSrc });
      if (result.objectDescription && result.objectDescription !== description) {
        setDescription(result.objectDescription);
        speak(result.objectDescription);
      }
    } catch (err) {
      console.error("Error identifying objects:", err);
      // We don't want to toast every time the model fails to identify
    } finally {
      setIsProcessing(false);
    }
  }, [webcamRef, speak, isProcessing, toast, description]);

  useEffect(() => {
    if (isCameraActive && hasCameraPermission) {
      captureInterval.current = setInterval(captureAndIdentify, 3000); // Increased interval for better UX
    } else if (captureInterval.current) {
      clearInterval(captureInterval.current);
    }

    return () => {
      if (captureInterval.current) {
        clearInterval(captureInterval.current);
      }
    };
  }, [isCameraActive, hasCameraPermission, captureAndIdentify]);

  useEffect(() => {
    if (isCameraActive) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(() => setHasCameraPermission(true))
        .catch(() => {
          setHasCameraPermission(false);
          setIsCameraActive(false);
          toast({
            variant: 'destructive',
            title: 'Camera Access Denied',
            description: 'Please enable camera permissions in your browser settings to use this feature.',
          });
        });
    } else {
        if (webcamRef.current?.stream) {
            webcamRef.current.stream.getTracks().forEach(track => track.stop());
        }
    }
  }, [isCameraActive, toast]);

  useEffect(() => {
    return () => {
      // Ensure camera is turned off on component unmount
      if (webcamRef.current?.stream) {
        webcamRef.current.stream.getTracks().forEach(track => track.stop());
      }
      if (captureInterval.current) {
        clearInterval(captureInterval.current);
      }
    };
  }, []);

  const toggleCamera = () => {
    setIsCameraActive(prev => !prev);
    setDescription(null);
    if (!isCameraActive) {
        setHasCameraPermission(null);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Vision Help</CardTitle>
          <CardDescription>
            The model will identify objects in your view in real-time.
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
                {hasCameraPermission === false && (
                    <Alert variant="destructive" className="mt-4 max-w-sm">
                        <AlertTitle>Camera Access Required</AlertTitle>
                        <AlertDescription>
                        Please allow camera access in your browser settings to use this feature.
                        </AlertDescription>
                    </Alert>
                )}
              </div>
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
                    key={description || 'placeholder'}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="w-full"
                >
                    {description ? (
                        <Alert>
                            <AlertTitle className="flex items-center justify-between">
                                <span>I can see...</span>
                                <Button variant="ghost" size="icon" onClick={() => speak(description)} aria-label="Read description aloud">
                                    <Volume2 className="h-5 w-5"/>
                                </Button>
                            </AlertTitle>
                            <AlertDescription className="text-xl font-bold">{description}</AlertDescription>
                        </Alert>
                    ) : (
                        <div className="flex h-full items-center justify-center rounded-lg border border-dashed text-center text-muted-foreground">
                            <p>Identified objects will appear here</p>
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
