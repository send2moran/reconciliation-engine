


Zeitgold Coding Exercise

Background
Zeitgold is a Berlin and Tel-Aviv based AI company providing a complete solution for financial
administration of small businesses.
Zeitgold delivers an accounting product for small business owners. Bookkeeping is the process
of reconciling payments and payables, meaning we connect outgoing payments with incoming
invoices and vice versa.
The two main entities of the Zeitgold data model are payables and payments. They can be
explained by:
Payables represent all the entities that have to be paid by the business. They can be invoices,
payrolls, employee expenses, etc...
Payments, as the name implies, represent payments, which can be a cash payment or bank
transfers by the business. You can think of a payment as a single line in the bank account
statement.
If you’re not familiar with reconciliation, it is the process of linking the payables to the relevant
payments. In a “pre-zeitgold” world, this process is done manually by the merchant, who has to
find a corresponding payable for each line in his bank account statement. The process is
manual of course, and as you can imagine, very time-consuming.
Requirements and Deliverables
● We prefer the implementation to be written in Python, Javascript, Java or C#, but make
sure you use a language you are comfortable with, even if is not in this list
● Provide a short `readme.md` file with just the steps on how your exercise can be
executed
● Send the results in an archive (e.g., zip) via email

Part A) - Build the reconciliation engine
Alongside this PDF you’re receiving a .json file containing the initial dataset you will be working
with. It is a list of payables including each ones amount, payment reference and payment date.
The goal for this part is to build an algorithm which reads in the data of a payment (reference,
date and amount) and returns the possibly related payables. There might be multiple

possibilities. Please note that some fields might not match by 100%, but ideally, the engine
should get even the more difficult matchings.
The algorithm should have a higher recall than precision(precision vs recall), meaning that in
case of uncertainty, it should prefer to include the business transaction rather than filtering it,
because the output is just a recommendation to a human operator.
Part B) - Build a REST server
The goal for this part is to build a simple web server wrapping the logic built in Part A. The
service should expose a REST endpoint, with the payment data as a JSON input object, and the
engine will return the possibly related payables.
The endpoint of the service should be a rest endpoint, that exposes a single POST endpoint
called “link”. The endpoint accepts a JSON as the body argument. This JSON represents the
payment details, and it will include the following fields:
● amount - The amount of the payment, should be correlated to the payable amount.
● payment_reference - This is the reference provided in the payment, which should
correlate to the referenceId in the payable.
● payment_date - the execution date of the payment
Part C) - Connect to dynamic data source
The Zeitgold system receives new payments and payables around the clock. Therefore your
algorithm should connect to a dynamic data source, instead of a static, possibly outdated list.
The goal for this part is to extend your work from Part B and get the data from a GraphQL
endpoint instead of reading it from a static file.
GraphQL
GraphQL is an open source query language for APIs, developed by Facebook. A GraphQL
scheme defines a typed data structure which the server exposes and the client can query. For
this exercise, you will be querying the real Zeitgold GraphQL scheme.
It is defined as follows
Payable
This is the main entity relevant for our purposes. The relevant fields are:

● Id - base64 unique ID
● Amount -

● referenceId - The identifier of the parable, this is not a unique identifier, as every
supplier can come up with any convention he sees fit, so there will be duplicates
here
● dateOccurred - this is the date that the business transaction occurred, in invoices
for example that would be the issue date.

Business
You should always run your algorithm in a context of a specific business or customer. You can
assume that you can load all the possible matching payables into memory before you execute
the matching logic. The relevant field here is the businessTransactions edge.
BusinessTransaction
This is the object which links payables to their payments. Unreconciled payables have a
business transaction as well.
BusinessTransaction has a one-to-many relation to Payable. You can query a list of payables
for a business by using the payable to business transaction relation.
GraphQL Endpoint
A GraphQL server exposes two URLs for the API:
1. /graphql - Used for executing queries (provided the “query” argument for the query and
the “variables” argument for the variables of the query).
2. /graphiql - a graphic interface for running queries, this is a simple web client for
performing queries, and it has some cool features like auto-completion. Moreover, this UI
expose a documentation for our scheme, with mapping of our scheme entities. This is
accessible by clicking “docs” in the top right corner.
In order to access the graphiql for example, the url is
https://web-backend-dev.zeitgold.com/graphiql
The BusinessId for the exercise:
QnVzaW5lc3NOb2RlOjE0Mjc2Y2FhLTA4NmEtNGVmNi04NzMxLTNmYWUzMjE3ZjVlZQ==
Query Language Syntax Example
The following example plus the documentation of graphql + graphiql should help you build the
required query.
Example Query: Get the name of a business
{
business(id:"QnVzaW5lc3NOb2RlOjE0Mjc2Y2FhLTA4NmEtNGVmNi04NzMxLTNmYWUzMjE3ZjVlZQ==") {
name
}

}

Generic Syntax Example:
{
<NODE> ( <FILTERS> ) {
<FIELD>
<FIELD>
<FIELD>
...
}
}
Appendix
Input Examples
These following payment JSONs should have matching payables (in the context of the exercise
business, so make sure to filter on the specific business). Given the number of expected
payables, you should be able to test your code.
Some of the examples are easy, while others are less trivial and might require some more
thinking ;)
It is fine if you are not able to match all the examples, the design and thinking behind the logic is
more important.
{'amount': 313, 'payment_reference': 'AB1273', 'payment_date': '2018-01-13'}
Expected number of payables: 1
-------------------------------
{'amount': 361, 'payment_reference': '29666779', 'payment_date': '2017-12-27'}
Expected number of payables: 1
-------------------------------
{'amount': 281, 'payment_reference': '99998856', 'payment_date': '2017-08-27'}
Expected number of payables: 1
-------------------------------
{'amount': 134, 'payment_reference': 'AB12141 12451141414', 'payment_date': '2017-10-18'}
Expected number of payables: 1
-------------------------------
{'amount': 255, 'payment_reference': '0115511414', 'payment_date': '2017-10-01'} payable_ids:
Expected number of payables: 1
-------------------------------
{'amount': 254, 'payment_reference': 'AZMTO158', 'payment_date': '2017-06-19'}
Expected number of payables: 2
-------------------------------

{'amount': 97, 'payment_reference': '98925959', 'payment_date': '2017-07-04'}
Expected number of payables: 1
-------------------------------
{'amount': 100, 'payment_reference': 'AB12121 AB12122', 'payment_date': '2017-05-26'}
Expected number of payables: 2



Run server using: node start or yarn start.

Call examples using curl:

curl -H "Content-Type: application/json" -X POST -d '{"amount": 313, "payment_reference": "AB1273", "payment_date": "2018-01-13"}' http://localhost:3000/link

curl -H "Content-Type: application/json" -X POST -d '{"amount": 100, "payment_reference": "AB12121 AB12122", "payment_date": "2017-05-26"}' http://localhost:3000/link


for local testing:

curl -H "Content-Type: application/json" -X POST -d '{"business_id": "UGF5YWJsZU5vZGU6OWU2MWUzNzAtZDMwYS00ZWFjLTkzNjgtNmQxODIzNDAyNTI3", "amount": 313, "payment_reference": "AB1273", "payment_date": "2018-01-13"}' http://localhost:3000/local-link




examples from instructions:


{'amount': 313, 'payment_reference': 'AB1273', 'payment_date': '2018-01-13'} Expected number of payables: 1
-------------------------------
{'amount': 361, 'payment_reference': '29666779', 'payment_date': '2017-12-27'} Expected number of payables: 1
-------------------------------
{'amount': 281, 'payment_reference': '99998856', 'payment_date': '2017-08-27'}
Expected number of payables: 1
-------------------------------
{'amount': 134, 'payment_reference': 'AB12141 12451141414', 'payment_date': '2017-10-18'} Expected number of payables: 1
-------------------------------
{'amount': 255, 'payment_reference': '0115511414', 'payment_date': '2017-10-01'} payable_ids: Expected number of payables: 1
-------------------------------
{'amount': 254, 'payment_reference': 'AZMTO158', 'payment_date': '2017-06-19'}
Expected number of payables: 2
-------------------------------
{'amount': 97, 'payment_reference': '98925959', 'payment_date': '2017-07-04'}
Expected number of payables: 1
-------------------------------
{'amount': 100, 'payment_reference': 'AB12121 AB12122', 'payment_date': '2017-05-26'} Expected number of payables: 2
