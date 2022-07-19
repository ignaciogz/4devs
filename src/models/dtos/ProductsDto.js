class ProductsDto {
    constructor(data) {
        this.id = data.id;
	    this.category = data.category;
	    this.name = data.name;
	    this.price = data.price;
        this.description = data.description;
	    this.img = data.img;
	    this.rating = data.rating;
	    this.stock = data.stock;
	    this.brand = data.brand;
	    this.timestamp = data.timestamp;
    }
}

module.exports = ProductsDto;