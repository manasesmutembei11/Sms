﻿using Sms.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Sms.Core.Domain.Util.Validations;
namespace Sms.Core.Domain.Repositories
{
    public interface IRepositoryBase<T, TId> where T : BaseEntity<TId> where TId : IEquatable<TId>
    {
        Task<bool> ExistAsync(TId id);
        T GetById(TId id);
        Task<T> GetByIdAsync(TId id, bool trackChanges = false);
        IQueryable<T> FindAll(bool trackChanges);
        IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression, bool trackChanges);


        void Create(T entity);
        void Update(T entity);
        void Delete(T entity);

        ValidationResultInfo Validate(T itemToValidate);

    }
}
