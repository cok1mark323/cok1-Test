import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, Grid, List } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { mockProducts, categories } from '../data/mockData';
import { FilterOptions } from '../types';

const Products: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<FilterOptions>({
    category: searchParams.get('category') || undefined,
    sortBy: 'newest'
  });

  // 过滤和排序商品
  const filteredProducts = useMemo(() => {
    let filtered = [...mockProducts];

    // 搜索过滤
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // 分类过滤
    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // 特殊过滤
    const filterType = searchParams.get('filter');
    if (filterType === 'new') {
      filtered = filtered.filter(product => product.isNew);
    } else if (filterType === 'hot') {
      filtered = filtered.filter(product => product.isHot);
    }

    // 价格范围过滤
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      filtered = filtered.filter(product => product.price >= min && product.price <= max);
    }

    // 尺码过滤
    if (filters.sizes && filters.sizes.length > 0) {
      filtered = filtered.filter(product =>
        filters.sizes!.some(size => product.sizes.includes(size))
      );
    }

    // 排序
    switch (filters.sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'newest':
      default:
        // 新品优先，然后按ID排序
        filtered.sort((a, b) => {
          if (a.isNew && !b.isNew) return -1;
          if (!a.isNew && b.isNew) return 1;
          return b.id.localeCompare(a.id);
        });
        break;
    }

    return filtered;
  }, [searchParams, filters]);

  const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({ sortBy: 'newest' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            商品列表
          </h1>
          <p className="text-gray-600">
            找到 {filteredProducts.length} 件商品
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">筛选</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  清除
                </button>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">分类</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      checked={!filters.category}
                      onChange={() => handleFilterChange({ category: undefined })}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">全部</span>
                  </label>
                  {categories.map(category => (
                    <label key={category.id} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        checked={filters.category === category.name}
                        onChange={() => handleFilterChange({ category: category.name })}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">
                        {category.name} ({category.count})
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">价格区间</h4>
                <div className="space-y-2">
                  {[
                    { label: '全部', range: undefined },
                    { label: '¥0 - ¥299', range: [0, 299] as [number, number] },
                    { label: '¥300 - ¥599', range: [300, 599] as [number, number] },
                    { label: '¥600 - ¥999', range: [600, 999] as [number, number] },
                    { label: '¥1000+', range: [1000, Infinity] as [number, number] }
                  ].map((option, index) => (
                    <label key={index} className="flex items-center">
                      <input
                        type="radio"
                        name="priceRange"
                        checked={JSON.stringify(filters.priceRange) === JSON.stringify(option.range)}
                        onChange={() => handleFilterChange({ priceRange: option.range })}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Size Filter */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">尺码</h4>
                <div className="grid grid-cols-3 gap-2">
                  {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                    <label key={size} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.sizes?.includes(size) || false}
                        onChange={(e) => {
                          const currentSizes = filters.sizes || [];
                          const newSizes = e.target.checked
                            ? [...currentSizes, size]
                            : currentSizes.filter(s => s !== size);
                          handleFilterChange({ sizes: newSizes.length > 0 ? newSizes : undefined });
                        }}
                        className="mr-1"
                      />
                      <span className="text-sm text-gray-700">{size}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Mobile Filter Button */}
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden flex items-center space-x-2 text-gray-700 hover:text-gray-900"
                  >
                    <Filter className="h-5 w-5" />
                    <span>筛选</span>
                  </button>

                  {/* Sort */}
                  <div className="flex items-center space-x-2">
                    <SlidersHorizontal className="h-5 w-5 text-gray-500" />
                    <select
                      value={filters.sortBy}
                      onChange={(e) => handleFilterChange({ sortBy: e.target.value as 'price-asc' | 'price-desc' | 'newest' | 'popular' })}
                      className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    >
                      <option value="newest">最新上架</option>
                      <option value="popular">最受欢迎</option>
                      <option value="price-asc">价格从低到高</option>
                      <option value="price-desc">价格从高到低</option>
                    </select>
                  </div>
                </div>

                {/* View Mode */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md ${
                      viewMode === 'grid'
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md ${
                      viewMode === 'list'
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="lg:hidden bg-white rounded-lg p-6 mb-6 shadow-sm">
                {/* 移动端筛选内容，与桌面端相同 */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">筛选</h3>
                  <button
                    onClick={clearFilters}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    清除
                  </button>
                </div>
                {/* 这里可以复用桌面端的筛选组件 */}
              </div>
            )}

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className={`grid gap-6 ${
                viewMode === 'grid'
                  ? 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4'
                  : 'grid-cols-1'
              }`}>
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    className={viewMode === 'list' ? 'flex' : ''}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg mb-4">没有找到符合条件的商品</p>
                <button
                  onClick={clearFilters}
                  className="text-black hover:text-gray-600 font-medium"
                >
                  清除筛选条件
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;