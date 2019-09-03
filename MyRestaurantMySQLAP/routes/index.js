var API_KEY = 1234

var express = require('express')
var router = express.Router()
var moment = require('moment')

//GET
router.get('/', function (req, res, next) {
    res.send('Hello World')
})

//====================================================================
// USER  TABLE
// POST AND GET
//====================================================================
router.get('/user', function (req, res, next) {
    if (req.query.key == API_KEY) {

        var fbid = req.query.fbid

        if (fbid != null) {
            req.getConnection(function (error, conn) {
                conn.query('SELECT userPhone,name,address,fbid FROM User WHERE fbid=?', [fbid], function (err, rows, fields) {

                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ sucess: false, message: err.message }))
                    }
                    else {
                        if (rows.length > 0) {
                            res.send(JSON.stringify({ sucess: true, result: rows }))
                        }
                        else {
                            res.send(JSON.stringify({ sucess: false, message: "Empty" }))
                        }
                    }
                })
            })
        }
        else {
            res.send(JSON.stringify({ success: false, message: "Missing fbid marfe" }))
        }
    }
    else {
        res.send(JSON.stringify({ success: false, message: "Wrong api key marfe" }))
    }
})



router.post('/user', function (req, res, next) {
    if (req.body.key == API_KEY) {

        var fbid = req.body.fbid
        var user_phone = req.body.userPhone
        var user_name = req.body.userName
        var user_address = req.body.userAddress


        if (fbid != null) {
            req.getConnection(function (error, conn) {
                conn.query('INSERT INTO User(FBID,UserPhone,Name,Address) VALUES(?,?,?,?) ON DUPLICATE KEY UPDATE Name=?,Address=?', [fbid, user_phone, user_name, user_address, user_name, user_address], function (err, rows, fields) {

                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ sucess: false, message: err.message }))
                    }
                    else {
                        if (rows.affectedRows > 0) {
                            res.send(JSON.stringify({ sucess: true, message: "Success" }))
                        }
                    }
                })
            })
        }
        else {
            res.send(JSON.stringify({ success: false, message: "Missing fbid marfe" }))
        }
    }
    else {
        res.send(JSON.stringify({ success: false, message: "Wrong api key marfe" }))
    }
})



//====================================================================
// FAVORITE  TABLE
// POST AND GET AND DELETE
//====================================================================
router.get('/favorite', function (req, res, next) {
    if (req.query.key == API_KEY) {

        var fbid = req.query.fbid

        if (fbid != null) {
            req.getConnection(function (error, conn) {
                conn.query('SELECT fbid,foodId,restaurantId,restaurantName,foodName,foodImage,price FROM Favorite WHERE fbid=?', [fbid], function (err, rows, fields) {

                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ sucess: false, message: err.message }))
                    }
                    else {
                        if (rows.length > 0) {
                            res.send(JSON.stringify({ sucess: true, result: rows }))
                        }
                        else {
                            res.send(JSON.stringify({ sucess: false, message: "Empty" }))
                        }
                    }
                })
            })
        }
        else {
            res.send(JSON.stringify({ success: false, message: "Missing fbid marfe" }))
        }
    }
    else {
        res.send(JSON.stringify({ success: false, message: "Wrong api key marfe" }))
    }
})

router.get('/favoriteByRestaurant', function (req, res, next) {
    if (req.query.key == API_KEY) {

        var fbid = req.query.fbid
        var restaurant_id = req.query.restaurantId


        if (fbid != null) {
            req.getConnection(function (error, conn) {
                conn.query('SELECT fbid,foodId,restaurantId,restaurantName,foodName,foodImage,price FROM Favorite WHERE fbid=? AND restaurantId=?', [fbid, restaurant_id], function (err, rows, fields) {

                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ sucess: false, message: err.message }))
                    }
                    else {
                        if (rows.length > 0) {
                            res.send(JSON.stringify({ sucess: true, result: rows }))
                        }
                        else {
                            res.send(JSON.stringify({ sucess: false, message: "Empty" }))
                        }
                    }
                })
            })
        }
        else {
            res.send(JSON.stringify({ success: false, message: "Missing fbid marfe" }))
        }
    }
    else {
        res.send(JSON.stringify({ success: false, message: "Wrong api key marfe" }))
    }
})

router.post('/favorite', function (req, res, next) {
    if (req.body.key == API_KEY) {

        var fbid = req.body.fbid
        var food_id = req.body.foodId
        var restaurant_id = req.body.restaurantId
        var restaurant_name = req.body.restaurantName
        var food_name = req.body.foodName
        var food_image = req.body.foodImage
        var food_price = req.body.price


        if (fbid != null) {
            req.getConnection(function (error, conn) {
                conn.query('INSERT INTO Favorite(FBID,FoodId,RestaurantId,RestaurantName,FoodName,FoodImage,Price) VALUES(?,?,?,?,?,?,?)', [fbid, food_id, restaurant_id, restaurant_name, food_name, food_image, food_price], function (err, rows, fields) {

                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ sucess: false, message: err.message }))
                    }
                    else {
                        if (rows.affectedRows > 0) {
                            res.send(JSON.stringify({ sucess: true, message: "Success" }))
                        }
                    }
                })
            })
        }
        else {
            res.send(JSON.stringify({ success: false, message: "Missing fbid body  marfe" }))
        }
    }
    else {
        res.send(JSON.stringify({ success: false, message: "Wrong api key marfe" }))
    }
})

router.delete('/favorite', function (req, res, next) {
    if (req.query.key == API_KEY) {

        var fbid = req.query.fbid
        var food_id = req.query.foodId
        var restaurant_id = req.query.restaurantId

        if (fbid != null) {
            req.getConnection(function (error, conn) {
                conn.query('DELETE FROM Favorite WHERE FBID=? AND FoodId=? AND ResaurantId=?', [fbid, food_id, restaurant_id], function (err, rows, fields) {

                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ sucess: false, message: err.message }))
                    }
                    else {
                        if (rows.affectedRows > 0) {
                            res.send(JSON.stringify({ sucess: true, message: "Success" }))
                        }
                    }
                })
            })
        }
        else {
            res.send(JSON.stringify({ success: false, message: "Missing fbid marfe" }))
        }
    }
    else {
        res.send(JSON.stringify({ success: false, message: "Wrong api key marfe" }))
    }
})

//====================================================================
// RESTAURANT   TABLE
// GET
//====================================================================

router.get('/restaurant', function (req, res, next) {
    if (req.query.key == API_KEY) {
            req.getConnection(function (error, conn) {
                conn.query('SELECT id,name,address,phone,lat,lng,userOwner,image,paymentUrl FROM Restaurant', function (err, rows, fields) {

                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ sucess: false, message: err.message }))
                    }
                    else {
                        if (rows.length > 0) {
                            res.send(JSON.stringify({ sucess: true, result: rows }))
                        }
                        else {
                            res.send(JSON.stringify({ sucess: false, message: "Empty" }))
                        }
                    }
                })
            })
        }
    else {
        res.send(JSON.stringify({ success: false, message: "Wrong api key marfe" }))
    }
})

router.get('/restaurantById', function (req, res, next) {
    if (req.query.key == API_KEY) {
        req.getConnection(function (error, conn) {
            var restuarant_id = req.query.restaurantId
            if (restuarant_id != null) {
                conn.query('SELECT id,name,address,phone,lat,lng,userOwner,image,paymentUrl FROM Restaurant WHERE id=?', [restuarant_id], function (err, rows, fields) {

                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ sucess: false, message: err.message }))
                    }
                    else {
                        if (rows.length > 0) {
                            res.send(JSON.stringify({ sucess: true, result: rows }))
                        }
                        else {
                            res.send(JSON.stringify({ sucess: false, message: "Empty" }))
                        }
                    }
                })

            } else {
                res.send(JSON.stringify({ sucess: false, message: "Missing restaurantId in query" }))
            }

        })
    }
    else {
        res.send(JSON.stringify({ success: false, message: "Wrong api key marfe" }))
    }
})

router.get('/nearbyrestaurant', function (req, res, next) {
    if (req.query.key == API_KEY) {
        req.getConnection(function (error, conn) {

            var user_lat = parseFloat(req.query.lat)
            var user_lng = parseFloat(req.query.lng)
            var distance = parseFloat(req.query.distance)

            if (user_lat != Number.NaN && user_lng != Number.NaN) {

                conn.query('SELECT * FROM (SELECT id,name,address,phone,lat,lng,userOwner,image,paymentUrl,'
                    + 'ROUND(111.045 * DEGREES(ACOS(COS(RADIANS(?)) * COS(RADIANS(lat))'
                    + '* COS(RADIANS(lng) - RADIANS(?)) + SIN(RADIANS(?))'
                    + '* SIN(RADIANS(lat)))),2) AS distance_in_km FROM Restaurant)tempTable WHERE distance_in_km < ?', [user_lat, user_lng, user_lat, distance], function (err, rows, fields) {

                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ sucess: false, message: err.message }))
                    }
                    else {
                        if (rows.length > 0) {
                            res.send(JSON.stringify({ sucess: true, result: rows }))
                        }
                        else {
                            res.send(JSON.stringify({ sucess: false, message: "Empty" }))
                        }
                    }
                })

            }
            else {
                res.send(JSON.stringify({ sucess: false, message: "Missing lat and lng in query" }))
            }
        })
    }
    else {
        res.send(JSON.stringify({ success: false, message: "Wrong api key marfe" }))
    }
})

//====================================================================
// MENU  TABLE
// GET
//====================================================================
router.get('/menu', function (req, res, next) {
    if (req.query.key == API_KEY) {
        req.getConnection(function (error, conn) {
            var restuarant_id = req.query.restaurantId
            if (restuarant_id != null) {
                conn.query('SELECT id,name,description,image FROM Menu WHERE id in (SELECT menuId FROM Restaurant_Menu WHERE restaurantId=?)', [restuarant_id], function (err, rows, fields) {

                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ sucess: false, message: err.message }))
                    }
                    else {
                        if (rows.length > 0) {
                            res.send(JSON.stringify({ sucess: true, result: rows }))
                        }
                        else {
                            res.send(JSON.stringify({ sucess: false, message: "Empty" }))
                        }
                    }
                })

            } else {
                res.send(JSON.stringify({ sucess: false, message: "Missing restaurantId in query" }))
            }

        })
    }
    else {
        res.send(JSON.stringify({ success: false, message: "Wrong api key marfe" }))
    }
})

//====================================================================
// FOOD  TABLE
// GET
//====================================================================
router.get('/food', function (req, res, next) {
    if (req.query.key == API_KEY) {
        req.getConnection(function (error, conn) {
            var menu_id = req.query.menuId
            if (menu_id != null) {
                conn.query('SELECT id,name,description,image,price,CASE WHEN isSize=1 THEN \'TRUE\' ELSE  \'FALSE\' END as isSize,'
                    +'CASE WHEN isAddon=1 THEN \'TRUE\' ELSE  \'FALSE\' END as isAddon,'
                    + 'discount FROM Food WHERE id in (SELECT foodId FROM Menu_Food WHERE menuId=?)', [menu_id], function (err, rows, fields) {

                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ sucess: false, message: err.message }))
                    }
                    else {
                        if (rows.length > 0) {
                            res.send(JSON.stringify({ sucess: true, result: rows }))
                        }
                        else {
                            res.send(JSON.stringify({ sucess: false, message: "Empty" }))
                        }
                    }
                })

            } else {
                res.send(JSON.stringify({ sucess: false, message: "Missing restaurantId in query" }))
            }

        })
    }
    else {
        res.send(JSON.stringify({ success: false, message: "Wrong MenuId key marfe" }))
    }
})

router.get('/foodById', function (req, res, next) {
    if (req.query.key == API_KEY) {
        req.getConnection(function (error, conn) {
            var food_id = req.query.foodId
            if (food_id != null) {
                conn.query('SELECT id,name,description,image,price,CASE WHEN isSize=1 THEN \'TRUE\' ELSE  \'FALSE\' END as isSize,'
                    + 'CASE WHEN isAddon=1 THEN \'TRUE\' ELSE  \'FALSE\' END as isAddon,'
                    + 'discount FROM Food WHERE id =?', [food_id], function (err, rows, fields) {

                        if (err) {
                            res.status(500)
                            res.send(JSON.stringify({ sucess: false, message: err.message }))
                        }
                        else {
                            if (rows.length > 0) {
                                res.send(JSON.stringify({ sucess: true, result: rows }))
                            }
                            else {
                                res.send(JSON.stringify({ sucess: false, message: "Empty" }))
                            }
                        }
                    })

            } else {
                res.send(JSON.stringify({ sucess: false, message: "Missing restaurantId in query" }))
            }

        })
    }
    else {
        res.send(JSON.stringify({ success: false, message: "Wrong FoodId key marfe" }))
    }
})

router.get('/searchfood', function (req, res, next) {
    if (req.query.key == API_KEY) {
        req.getConnection(function (error, conn) {
            var search_query = '%' + req.query.foodName+'%'
            if (search_query != null) {
                conn.query('SELECT id,name,description,image,price,CASE WHEN isSize=1 THEN \'TRUE\' ELSE  \'FALSE\' END as isSize,'
                    + 'CASE WHEN isAddon=1 THEN \'TRUE\' ELSE  \'FALSE\' END as isAddon,'
                    + 'discount FROM Food WHERE name LIKE ?', [search_query], function (err, rows, fields) {

                        if (err) {
                            res.status(500)
                            res.send(JSON.stringify({ sucess: false, message: err.message }))
                        }
                        else {
                            if (rows.length > 0) {
                                res.send(JSON.stringify({ sucess: true, result: rows }))
                            }
                            else {
                                res.send(JSON.stringify({ sucess: false, message: "Empty" }))
                            }
                        }
                    })

            } else {
                res.send(JSON.stringify({ sucess: false, message: "Missing restaurantId in query" }))
            }

        })
    }
    else {
        res.send(JSON.stringify({ success: false, message: "Wrong FoodName key marfe" }))
    }
})
//====================================================================
// SIZE  TABLE
// GET
//====================================================================
router.get('/size', function (req, res, next) {
    if (req.query.key == API_KEY) {
        req.getConnection(function (error, conn) {
            var food_id = req.query.foodId
            if (food_id != null) {
                conn.query('SELECT id,description,extraPrice FROM Size WHERE id in (SELECT sizeId FROM Food_Size WHERE foodid=?)', [food_id], function (err, rows, fields) {

                        if (err) {
                            res.status(500)
                            res.send(JSON.stringify({ sucess: false, message: err.message }))
                        }
                        else {
                            if (rows.length > 0) {
                                res.send(JSON.stringify({ sucess: true, result: rows }))
                            }
                            else {
                                res.send(JSON.stringify({ sucess: false, message: "Empty" }))
                            }
                        }
                    })

            } else {
                res.send(JSON.stringify({ sucess: false, message: "Missing restaurantId in query" }))
            }

        })
    }
    else {
        res.send(JSON.stringify({ success: false, message: "Wrong foodId key marfe" }))
    }
})
//====================================================================
// ADDON  TABLE
// GET
//====================================================================
router.get('/addon', function (req, res, next) {
    if (req.query.key == API_KEY) {
        req.getConnection(function (error, conn) {
            var food_id = req.query.foodId
            if (food_id != null) {
                conn.query('SELECT id,description,extraPrice FROM Addon WHERE id in (SELECT addonId FROM Food_Addon WHERE foodid=?)', [food_id], function (err, rows, fields) {

                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ sucess: false, message: err.message }))
                    }
                    else {
                        if (rows.length > 0) {
                            res.send(JSON.stringify({ sucess: true, result: rows }))
                        }
                        else {
                            res.send(JSON.stringify({ sucess: false, message: "Empty" }))
                        }
                    }
                })

            } else {
                res.send(JSON.stringify({ sucess: false, message: "Missing restaurantId in query" }))
            }

        })
    }
    else {
        res.send(JSON.stringify({ success: false, message: "Wrong foodId key marfe" }))
    }
})
//====================================================================
// ORDER  TABLE
// GET / POST 
//====================================================================
router.get('/order', function (req, res, next) {
    if (req.query.key == API_KEY) {
        req.getConnection(function (error, conn) {
            var order_fbid = req.query.orderFBID
            if (order_fbid != null) {
                conn.query('SELECT orderId,orderFBID,orderPhone,orderName,orderAddress,orderStatus,orderDate,'
                    + 'restaurantId,transactionId,'
                    + 'CASE WHEN cod=1 THEN \'TRUE\' ELSE \'FALSE\' END as cod,'
                    + 'totalPrice,numOfItem FROM `order` WHERE orderFBID =? AND numOfItem > 0'
                    + ' ORDER BY orderId DESC', [order_fbid], function (err, rows, fields) {

                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ sucess: false, message: err.message }))
                    }
                    else {
                        if (rows.length > 0) {
                            res.send(JSON.stringify({ sucess: true, result: rows }))
                        }
                        else {
                            res.send(JSON.stringify({ sucess: false, message: "Empty" }))
                        }
                    }
                })

            } else {
                res.send(JSON.stringify({ sucess: false, message: "Missing restaurantId in query" }))
            }

        })
    }
    else {
        res.send(JSON.stringify({ success: false, message: "Wrong orderFBID key marfe" }))
    }
})

router.post('/createOrder', function (req, res, next) {
    if (req.body.key == API_KEY) {

        var order_phone = req.body.orderPhone
        var order_name = req.body.orderName
        var order_address = req.body.orderAddress
        var order_date = moment(req.body.orderDate, "MM/DD/YYYY").format("YYYY-MM_DD")
        var restaurant_id = req.body.restaurantId
        var transaction_id = req.body.transactionId
        var cod = req.body.cod
        var total_price = req.body.totalPrice
        var num_of_item = req.body.numOfItem
        var order_fbid = req.body.orderFBID




        if (order_fbid != null) {
            req.getConnection(function (error, conn) {
                conn.query('INSERT INTO `Order`(OrderFBID,OrderPhone,OrderName,OrderAddress,OrderStatus,OrderDate,RestaurantId,'
                    + 'TransactionId,COD,TotalPrice,NumOfItem) VALUES(?,?,?,?,?,?,?,?,?,?,?)', [order_fbid, order_phone, order_name, order_address, 0, order_date, restaurant_id, transaction_id, cod, total_price, num_of_item], function (err, rows, fields) {

                        if (err) {
                            res.status(500)
                            res.send(JSON.stringify({ sucess: false, message: err.message }))
                        }
                        else {
                            conn.query('SELECT OrderId as OrderNumber FROM `Order` WHERE OrderFBID=? AND NumOfItem > 0 '
                                + 'ORDER BY orderNumber DESC LIMIT 1', [order_fbid], function (err, rows, fields) {

                                    if (err) {
                                        res.status(500)
                                        res.send(JSON.stringify({ sucess: false, message: err.message }))
                                    }
                                    else {
                                        res.send(JSON.stringify({ sucess: false, result: rows }))
                                    }
                                })

                            }
                })
            })
        }
        else {
            res.send(JSON.stringify({ success: false, message: "Missing orderFBID body  marfe" }))
        }
    }
    else {
        res.send(JSON.stringify({ success: false, message: "Wrong api key marfe" }))
    }
})

//====================================================================
// ORDERDETAILS  TABLE
// GET / POST 
//====================================================================
router.get('/orderDetail', function (req, res, next) {
    if (req.query.key == API_KEY) {
        req.getConnection(function (error, conn) {
            var order_id = req.query.orderId
            if (order_id != null) {
                conn.query('SELECT orderId,itemId,quantity,discount,extraPrice,size,addOn FROM OrderDetail WHERE orderId=?', [order_id], function (err, rows, fields) {

                        if (err) {
                            res.status(500)
                            res.send(JSON.stringify({ sucess: false, message: err.message }))
                        }
                        else {
                            if (rows.length > 0) {
                                res.send(JSON.stringify({ sucess: true, result: rows }))
                            }
                            else {
                                res.send(JSON.stringify({ sucess: false, message: "Empty" }))
                            }
                        }
                    })

            } else {
                res.send(JSON.stringify({ sucess: false, message: "Missing orderId in query" }))
            }

        })
    }
    else {
        res.send(JSON.stringify({ success: false, message: "Wrong orderFBID key marfe" }))
    }
})

router.post('/updateOrder', function (req, res, next) {
    if (req.body.key == API_KEY) {

        var order_id = req.body.orderId
        var order_detail

        try {
            order_detail = JSON.parse(req.body.orderDetail)
        }
        catch(err){
            res.status(500)
            res.send(JSON.stringify({ sucess: false, message: err.message }))
        }

        if (order_detail != null && order_id != null) {

            var data_insert = []
            for (i = 0; i < order_detail.length; i++) {
                data_insert[i] = [
                    parseInt(order_id),
                    order_detail[i]["foodId"],
                    order_detail[i]["foodQuantity"],
                    order_detail[i]["foodPrice"],
                    0, // discount
                    order_detail[i]["foodSize"],
                    order_detail[i]["foodAddon"],
                    parseFloat(order_detail[i]["foodExtraPrice"])
                ]
            }
            req.getConnection(function (error, conn) {
                conn.query('INSERT INTO OrderDetail(OrderId,ItemId,Quantity,Price,Discount,Size,Addon,ExtraPrice) VALUES(?)', data_insert, function (err, rows, fields) {

                        if (err) {
                            res.status(500)
                            res.send(JSON.stringify({ sucess: false, message: err.message }))
                        }
                        else {
                            res.send(JSON.stringify({ sucess: true, message:"update success"}))

                        }
                    })
            })
        }
        else {
            res.send(JSON.stringify({ success: false, message: "Missing orderID body  marfe" }))
        }
    }
    else {
        res.send(JSON.stringify({ success: false, message: "Wrong api key marfe" }))
    }
})

module.exports = router