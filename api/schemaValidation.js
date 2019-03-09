const Joi=require("joi");

function validateSchema(course,verb)
{
    if(verb==="post")
    {
        const schemaPost={
            name: Joi.string().min(2).required(),
            description: Joi.string().min(2).required(),
            price : Joi.number().required(),
            ispublished : Joi.boolean().required()
        }
        return Joi.validate(course,schemaPost);
    }

    if(verb==="put" || verb ==="delete")
    {
        const schema={
            name: Joi.string().min(2),
            description: Joi.string().min(2),
            price : Joi.number(),
            ispublished : Joi.boolean()
        }
        return Joi.validate(course,schema);
    }

    

}

exports.validate=validateSchema