export default {
    name: 'product',
    type: 'document',
    title: 'Product',
    fields: [
        {
            name: 'name',
            type: 'string',
            title: 'Name'
        },
        {
            name: 'description',
            type: 'string',
            title: 'Description'
        },
        {
            name: 'image',
            type: 'image',
            title: 'Image'
        },
        {
            name: 'price',
            type: 'number',
            title: 'Price'
        },
        {
            name: 'category',
            title: "Product Category",
            type: 'reference',
            to: [{type: 'category'}]
            
        }
        
    ]
}