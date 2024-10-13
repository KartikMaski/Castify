import React from 'react'
import { ReactNode } from 'react';
import Image from 'next/image';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  


interface MeetingModalProps{
    isOpen:boolean;
    onClose:()=>void;
    title:string;
    className?:string;
    children?:ReactNode;
    handleClick?:()=>void;
    buttonText?:string;
    image?:string;
    buttonIcon?:string;
}
const MeetingModal = ({isOpen,onClose,title,className, children, handleClick, buttonText, image, buttonIcon}: MeetingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent className='flex w-full max-w-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white'>
            <div className='flex flex-col gap-6'>
                {image &&(
                    <div>
                        <Image src={image} alt='image' width={72} height={72}/>
                    </div>
                )}
                <h1 className={cn('text-3xl font-bold leading-[42px]',className)}>{title}</h1>
                {children}
                <Button className='bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0' onClick={handleClick}>
                    {buttonIcon && (
                        <Image src={buttonIcon} alt='buttonIcon' width={13} height={13}/>
                    )} &nbsp;
                {buttonText || 'Schedule Meeting'}
                </Button>
            </div>
        </DialogContent>
    </Dialog>

  )
}

export default MeetingModal
