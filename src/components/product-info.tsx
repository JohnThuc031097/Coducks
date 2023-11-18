import { useState } from 'react';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { RatingAverage } from './reviews';
import type { CartItem, Product } from '../types';

export const ProductInfo = ({
    product,
    addToCart,
}: {
    product: Product;
    addToCart: (item: CartItem) => void;
}) => {
    const [size, setSize] = useState('');
    const item = { product, size: size, quantity: 1 };

    return (
        <div className="flex flex-col gap-5 p-5">
            <h2 className="flex justify-between text-3xl font-normal">
                <span className="w-2/3">{product.name}</span>
                <span>${product.price}</span>
            </h2>
            <RatingAverage reviews={product.reviews} />

            <div className="flex items-end justify-between">
                <SizeToggle
                    sizes={product.sizes}
                    onChange={(s) => setSize(s)}
                />
                <button
                    className="rounded bg-black px-5 py-2 font-medium text-white disabled:bg-gray-dark"
                    disabled={!size}
                    onClick={() => addToCart(item)}
                >
                    Add to Cart
                </button>
            </div>

            <p>{product.description}</p>
        </div>
    );
};

export const SizeToggle = ({
    sizes,
    onChange,
}: {
    sizes: Product['sizes'];
    onChange: (s: string) => void;
}) => {
    return (
        <div className="flex w-40 flex-col items-start gap-1  font-medium">
            <label className="leading-tight">Size</label>
            <ToggleGroup.Root
                type="single"
                aria-label="Product size"
                onValueChange={onChange}
                className="grid w-full grid-flow-col rounded bg-gray-light"
            >
                {sizes.map((size, i) => (
                    <ToggleGroup.Item
                        className="cursor-pointer rounded bg-gray-light px-5 py-2 data-[state=on]:bg-yellow"
                        key={i}
                        value={size}
                        title={`Size ${size}`}
                        aria-label={`Size ${size}`}
                    >
                        {size}
                    </ToggleGroup.Item>
                ))}
            </ToggleGroup.Root>
        </div>
    );
};
