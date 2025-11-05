
'use client';

import React from 'react';
import { Menu } from 'lucide-react';
import Link from 'next/link';

import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';

export function SiteHeader() {
	const [open, setOpen] = React.useState(false);

	return (
		<header
			className={cn(
				'sticky top-5 z-50',
				'mx-auto w-full max-w-5xl rounded-lg border shadow',
				'bg-background/95 supports-[backdrop-filter]:bg-background/80 backdrop-blur-lg',
			)}
		>
			<nav className="mx-auto flex items-center justify-between p-1.5">
				<Link
					href="/"
					className="hover:bg-accent flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 duration-100"
				>
					<Icons.logo className="size-5" />
					<p className="font-mono text-base font-bold">{siteConfig.name}</p>
				</Link>
				<div className="hidden items-center gap-1 md:flex">
					{siteConfig.mainNav.map((link) => (
						<Link
							key={link.href}
							className={buttonVariants({ variant: 'ghost', size: 'sm' })}
							href={link.href}
						>
							{link.label}
						</Link>
					))}
				</div>
				<div className="flex items-center gap-2">
					<Link href={siteConfig.links.settings} passHref>
						<Button size="sm" variant="ghost">
							Settings
						</Button>
					</Link>
					<Sheet open={open} onOpenChange={setOpen}>
						<SheetTrigger asChild>
							<Button size="icon" variant="outline" className="md:hidden">
								<Menu className="size-4" />
							</Button>
						</SheetTrigger>
						<SheetContent
							className="bg-background/95 supports-[backdrop-filter]:bg-background/80 backdrop-blur-lg "
							side="left"
						>
							<SheetHeader>
								<SheetTitle>
									<Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
										<Icons.logo className="mr-2 h-6 w-6" />
										<span className="font-bold">{siteConfig.name}</span>
									</Link>
								</SheetTitle>
							</SheetHeader>
							<div className="flex flex-col gap-4 mt-8">
								{siteConfig.mainNav.map((item) => (
									<Link
										key={item.href}
										href={item.href}
										className={cn(
											buttonVariants({
												variant: 'ghost',
												className: 'justify-start text-lg',
											}),
										)}
										onClick={() => setOpen(false)}
									>
										{item.title}
									</Link>
								))}
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</nav>
		</header>
	);
}
