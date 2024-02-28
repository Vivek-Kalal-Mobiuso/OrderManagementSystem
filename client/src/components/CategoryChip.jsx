import React from 'react'
import "../css/categorychip.css"
import {
    books,
    clothes,
    computer,
    electronics,
    mobiles,
    stationary,
    toys,
    watches,
    bags,
} from "../assets/CategoryChips"


const importAll = (context) => context.keys().reduce((acc, key) => {
    const imageName = key.replace('./', '').replace('.png', ''); // Adjust the file extension if needed
    acc[imageName] = context(key).default;
    return acc;
}, {});

const images = importAll(require.context('../assets/CategoryChips', false, /\.(png)$/));

const CategoryChip = ({ category, index }) => {
    if (index > 1 && index < 12 && index !== 10) {
        const imageSource = images[category.productDescription.toLowerCase()];
        console.log(images);
        // console.log(imageSource);
        // console.log(require.context('../assets/CategoryChips', false, /\.(png)$/));
        return (
            <div
                className='category-chip'
                data-toggle="tooltip"
                data-placement="bottom"
                title={category.productDescription}
            >
                <img src={imageSource} alt={category.productDescription} />
                {category.productDescription}
            </div>
        )
    } else {
        return (<></>)
    }

}

export default CategoryChip