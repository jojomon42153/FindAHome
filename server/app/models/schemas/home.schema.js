module.exports = dtb => {
    return dtb.model("Home", new dtb.Schema({
        bedrooms: {type: Number},
        zipCode: {type: Number},
        description: {type: String, trim: true},
        floor: {type: Number},
        elevator: {type: Boolean},
        images: {type: Array},
        price: {type: Number},
        ref: {type: String, trim: true},
        rooms: {type: Number},
        surface: {type: Number},
        title: {type: String, trim: true},
        link: {type: String, trim: true},
        checksum: {type: String, required: true},
        from: {type: String, required: true},
        id: {type: Number},
        url: {type: String, required: true}
    }));
};
