using API.DTOs;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class BasketExtensions
    {
        public static BasketDto MapBasketToDto(this Basket basket)
        {
            return new BasketDto
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                PaymentIntentId = basket.PaymentIntentId,
                ClientSecret = basket.ClientSecret,
                Items = basket.Items.Select(i => new BasketItemDto
                {
                    ProductId = i.ProductId,
                    Name = i.Product.Name,
                    Price = i.Product.Price,
                    PictureUrl = i.Product.PictureUrl,
                    Type = i.Product.Type,
                    Brand = i.Product.Brand,
                    Quantity = i.Quantity
                }).ToList()
            };
        }

        public static IQueryable<Basket> RetrieveBasketWithItems(this IQueryable<Basket> query, string buyerId)
        {
            return query.Include(i => i.Items)
                        .ThenInclude(p => p.Product)
                        .Where(b => b.BuyerId == buyerId);
        }
    }
}