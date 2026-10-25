namespace CatalogService.domain.entities
{
    public class Product
    {
        public Product() { } // конструктор

        public Product(int ProductId, string Name, decimal Price, int Orders_Count) // конструктор
        {
            productid = ProductId;
            name = Name;
            price = Price;
            orders_count = Orders_Count;
        }

        // Описание сущности
        public int productid { get; set; }

        public string name { get; set; }

        public decimal price { get; set; }

        public int orders_count { get; set; }

    }
}
