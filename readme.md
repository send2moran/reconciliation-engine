
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