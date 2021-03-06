const Inventory = require('../models/inventory');

module.exports = {
    index,
    create,
    Delete,
    update,
};

async function index(req, res) {
   let items = await Inventory.find({});
    res.status(200).json(items)
  }

async function create(req,res)
{
    try
    {await Inventory.create(req.body)   
    } catch (err) {
        res.json({err});
      }
}

async function Delete(req,res)
{
    try{
    await Inventory.findByIdAndDelete(req.params.id,(e)=>{
        res.status(200);
    })}catch(e){console.log(e)}
}


async function update(req,res)
{  
    try{
  await  Inventory.updateOne({_id: req.params.id},{...req.body}).then(res.status(200))
    }catch(e){console.log(e)}
}