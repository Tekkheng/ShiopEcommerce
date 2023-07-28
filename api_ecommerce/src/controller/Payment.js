import midtransClient from "midtrans-client";

const E = process.env;
const pay = (req,res)=>{
    try{
        const snap = new midtransClient.Snap({
            isProduction: false,
            serverKey: E.SK_MIDTRANS,
            clientKey: E.CK_MIDTRANS,
        })
        const gross_amount = req.body.total;
        const parameter = {
            transaction_details: {
                order_id: req.body.order_id,
                gross_amount: gross_amount,
            }, 
            customer_details: {
                first_name: req.body.name,
            },
            enabled_payments: ["credit_card", "gopay","permata_va",
            "bca_va", "bni_va", "bri_va","cimb_va", "other_va",
            "danamon_online"],
        }

        snap.createTransaction(parameter).then((transaction)=>{
            const dataPayment = {
                response: JSON.stringify(transaction),
            };
            const token = transaction.token;
            res.status(200).json({msg: "berhasil", dataPayment, token: token})
        })

    }catch(err){
        res.status(500).json({msg: error});
    }
}

// const pay = async (req,res)=>{
//     try{
//         return res.status(200).json({status: 'succes'});
//     }catch(err){
//         return res.status(500).json({status: 'fail', Servermsg: err.message});
//     }
// }
export default pay