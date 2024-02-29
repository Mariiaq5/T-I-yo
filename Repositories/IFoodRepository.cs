﻿using T_I_yo_blog.Models;

namespace T_I_yo_blog.Repositories
{
    public interface IFoodRepository
    {
        void Add(Food food);
        void Delete(int foodId);
        List<Food> GetAll();
        List<Food> GetById(int id);
        Food GetFoodById(int id);
        void Update(Food food);
    }
}