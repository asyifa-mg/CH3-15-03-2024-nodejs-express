const fs = require("fs");
const customers = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/dummy.json`)
);

const getCustomers = (req, res, next) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: "success",
    totalData: customers.length,
    requestAt: req.requestTime,
    data: {
      customers,
    },
  });
};

//api utk get data by id
const getCustomersById = (req, res, next) => {
  //shorhcut pemanggilan objek
  const id = req.params.id;
  //menggunakan array method untuk membntu menemukan spesifik data
  const customer = customers.find((cust) => cust._id === id);
  //console.log(customer);
  res.status(200).json({
    status: "success",
    data: {
      customer,
    },
  });
};

//api untuk update data
const updateCustomer = (req, res) => {
  console.log("masuk tidak ya");
  const id = req.params.id;

  //1. lakukan pencarian data yang sesuai parameter id nya
  const customer = customers.find((cust) => cust._id === id);
  const customerIndex = customers.findIndex((cust) => cust._id === id);

  console.log(customer);
  console.log(customerIndex);
  console.log(!customer);

  // 2. ada gak data customer nya
  if (!customer) {
    //pencarian jika data tdk ada
    return res.status(404).json({
      status: "fail",
      message: `Customer dengan ID: ${id}" gak ada`,
    });
  }
  //3. kalau ada berarti update data nya sesuai request body dari client/user
  customers[customerIndex] = { ...customers[customerIndex], ...req.body };
  console.log(customers[customerIndex]);
  //4. melakukan update didokumen  json nya
  fs.writeFile(
    `${__dirname}/data/dummy.json`,
    JSON.stringify(customers),
    (err) => {
      res.status(201).json({
        status: "success",
        message: "berhasil update data",
      });
    }
  );
};

//API UNTUK DELETE DATA
const deleteCustomer = (req, res) => {
  const id = req.params.id;

  //1. lakukan pencarian data yang sesuai parameter id nya
  const customer = customers.find((cust) => cust._id === id);
  const customerIndex = customers.findIndex((cust) => cust._id === id);

  // // 2. ada gak data customer nya
  if (!customer) {
    //pencarian jika data tdk ada
    return res.status(404).json({
      status: "fail",
      message: `Customer dengan ID: ${id}" gak ada`,
    });
  }
  //3. kalau ada berarti update data nya sesuai request body dari client/user
  customers.splice(customerIndex, 1);
  //4. melakukan update didokumen json nya
  fs.writeFile(
    `${__dirname}/data/dummy.json`,
    JSON.stringify(customers),
    (err) => {
      res.status(201).json({
        status: "success",
        message: "berhasil delete data",
      });
    }
  );
};

// API membuat data baru atau untuk bagian collection "create new customer" di postman
const createCustomer = (req, res) => {
  console.log(req.body);

  // const newCustomers = Object.assign
  const newCustomer = req.body;
  customers.push(newCustomer);

  fs.writeFile(
    `${__dirname}/data/dummy.json`,
    JSON.stringify(customers),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          customer: newCustomer,
        },
      });
    }
  );
};

module.exports = {
  getCustomers,
  getCustomersById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
