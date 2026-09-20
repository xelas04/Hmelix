namespace CatalogService.domain.entities
{
    public class Product
    {
        public Product() { } // конструктор

        public Product(int ProductId, string Name, decimal Price) // конструктор
        {
            productid = ProductId;
            name = Name;
            price = Price;
        }

        // Описание сущности
        public int productid { get; set; }

        public string name { get; set; }

        public decimal price { get; set; }
    
    }
}
