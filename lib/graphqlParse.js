import similarity from "./similarity";
import { request } from "graphql-request";

const endpoint = "https://web-backend-dev.zeitgold.com/graphql";
const args = {
  businessId:
    "QnVzaW5lc3NOb2RlOjE0Mjc2Y2FhLTA4NmEtNGVmNi04NzMxLTNmYWUzMjE3ZjVlZQ=="
};

const payablesQuery = `query payables {
  payables {
    edges {
      node {
        id
        amount
        dateOccurred
        referenceId
        businessTransaction {
          id
          business {
            id
          }
        }
      }
    }
  }
}`;

const localParse = (req, res, json_data) => {
  if (req.is("json") && req.body) {
    let paymentAmount = req.body.amount;
    let paymentReference = req.body.payment_reference;
    let paymentDate = req.body.payment_date;

    // console.log(req.body);

    request(endpoint, payablesQuery, args)
      .then(data => {
        const allPayables = data.payables.edges;

        // filter payables by business id
        const filteredByBusinessId = allPayables.filter(
          payable =>
            payable.node.businessTransaction &&
            payable.node.businessTransaction.business.id == args.businessId
        );

        //get possible businessTransaction ids
        const filteredByPaymentInput = filteredByBusinessId.filter(
          payable =>
            Date.parse(payable.node.dateOccurred) <= Date.parse(paymentDate) &&
            (payable.node.amount == paymentAmount ||
              payable.node.referenceId == paymentReference ||
              similarity(payable.node.referenceId, paymentReference))
        );

        // only show payable ids
        let possibleTransactionsIds = filteredByPaymentInput.map(
          payable => payable.node.businessTransaction.id
        );

        res.json(possibleTransactionsIds);
      })
      .catch(e => {
        console.log("big problem with: " + e);
      });
  }
};

export default localParse;
