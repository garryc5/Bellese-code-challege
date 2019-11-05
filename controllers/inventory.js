const Inventory = require('../models/inventory');

module.exports = {
    index,
    Add,
    Delete,
    update,
};

async function index(req, res) {
   let items = await Inventory.find({})
    res.status(200).json(items)
  }

async function Add(req,res)
{
    try
    {await Inventory.create(req.body)   
        index(req,res);
    } catch (err) {
        res.json({err});
      }
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