export default {
    name: 'category',
    type: 'document',
    title: 'Category',
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
            name: 'reference',
            type: 'reference',
            to: [{type: 'product'}]
            
        }
    ]
}