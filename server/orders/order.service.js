const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    getLocalOrder,
    getDeliveryOrder,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.Order.findAll();
}

async function getLocalOrder(localId) {
    return await db.Order.findAll({ 
        where: { LocalAccountId: localId },
        include: [db.Delivery] 
    });
}

async function getDeliveryOrder(deliveryId) {
    return await db.Order.findAll({ 
        where: { DeliveryAccountId: deliveryId },
        include: [db.Local] 
    });
}

async function getById(id) {
    return await getOrder(id);
}

async function create(params) {
    return await db.Order.create(params);
}

async function update(id, params) {
    const order = await getOrder(id);
    Object.assign(order, params);
    await order.save();

    return order.get();
}

async function _delete(id) {
    const order = await getOrder(id);
    await order.destroy();
}

// helper functions

async function getOrder(id) {
    const order = await db.Order.findByPk(id, { include: [db.Delivery] } )
    if (!order) throw 'Orden no encontrada';
    return order;
}
