const mongoose = require('mongoose');

const addressObject = {
    customer_id: {
        type: Number
    },
    first_name: {
        type: Number
    },
    last_name: {
        type: Number
    },
    company: {
        type: String
    },
    address1: {
        type: String
    },
    address2: {
        type: String
    }
}

const shopifyCustomersSchema = new mongoose.Schema(
    {
        address: {
            type: [addressObject]
        },
        admin_graphql_api_id: {
            type: String
        },
        currency: {
            type: String
        },
        email: {
            type: String
        },
        first_name: {
            type: String
        },
        id: {
            type: Number
        },
        last_name: {
            type: String
        },
        last_order_id: {
            type: Number
        },
        last_order_name: {
            type: String
        },
        multipass_identifier: {
            type: mongoose.Schema.Types.Mixed
        },
        note: {
            type: String
        },
        orders_count: {
            type: Number
        },
        phone: {
            type: Number
        },
        sms_marketing_consent: {
            type: Boolean
        },
        state: {
            type: String
        },
        tags: {
            type: String
        },
        tax_exempt: {
            type: Boolean
        },
        total_spent: {
            type: String
        },
        verified_email: {
            type: Boolean
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('shopifyCustomer', shopifyCustomersSchema);