import similarity from "./similarity";

const localParse = (req, res, json_data) => {
  if (req.is("json") && req.body) {
    let paymentAmount = req.body.amount;
    let paymentReference = req.body.payment_reference;
    let paymentDate = req.body.payment_date;
    let businessId = req.body.business_id;

    const allPayables = json_data;

    // filter payables by business id
    const filteredByBusinessId = allPayables.filter(payable => {
      console.log(payable.id, businessId);
      return payable.id == businessId;
    });

    //get possible businessTransaction ids
    const filteredByPaymentInput = filteredByBusinessId.filter(
      payable =>
        Date.parse(payable.dateOccurred) <= Date.parse(paymentDate) &&
        (payable.amount == paymentAmount ||
          payable.referenceId == paymentReference ||
          similarity(payable.referenceId, paymentReference))
    );

    // only show payable ids
    let possibleTransactionsIds = filteredByPaymentInput.map(
      payable => payable.id
    );

    res.json(possibleTransactionsIds);
  }
};

export default localParse;
