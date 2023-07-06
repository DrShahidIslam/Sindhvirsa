import Image from 'next/image'
import React, { FC } from 'react'
import { Iproduct } from '../product/page';
import { client } from '@/lib/sanityClient'; 
import Link from 'next/link';
import { urlFor } from '@/lib/sanityClient';



const SearchResult: FC<{ singleProductData: Iproduct }> = ({ singleProductData }) => {
    return (
        <div className='mx-auto w-[11rem] md:w-[16rem] space-y-3 duration-300'>
            <div className='relative w-full'>
                <div className='absolute inset-0 z-10' />
                <Image width={1000} height={1000} src={urlFor(singleProductData.image).width(1000).height(1000).url()} alt='sindhvirsa' />
            </div>
            <div className='space-y-1 text-gray-600 font-semibold text-lg select-none'>
                <Link href={`/catalog/${singleProductData.slug}`}>
                    <h6>{singleProductData.name}</h6>
                    <p>${singleProductData.price}</p>
                </Link>
            </div>
        </div>
    )
}

export default SearchResult