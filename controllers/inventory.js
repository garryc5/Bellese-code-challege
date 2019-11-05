const Inventory = require('../models/inventory');

module.exports = {
    getAll,
    Add,
    Delete,
    update,
};

async function getAll(req, res) {
  await Inventory.find({}).then(items => {
    res.status(200).json(items)
  })}

async function Add(req,res)
{
    await Inventory.create({...req.body},(e)=>{
        if(e) console.log(e)
        Inventory.save()
        res.status(200);
    })
}

async function Delete(req,res)
{
    await Inventory.deleteOne({_id: req.params.id},(e)=>{
        if(e) console.log(e)
        Inventory.save()
        res.status(200);
    }
    )
}


async function update(req,res)
{
  await  Inventory.updateOne({_id: req.params.id},(e)=>{
        if(e) console.log(e)
        Inventory.save()
        res.status(200);
    }
    )
}