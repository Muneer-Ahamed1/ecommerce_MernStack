
import { Fragment, useEffect, useState } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import ProductCard from "./ProductCard.jsx"
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProductsAsync, fetchProductsByFilterAsync, sortProductsAsync,fetchCategoryAsync,fetchBrandsAsync } from '../productListSlice.js'
import dataJson from "../../../../data.json"
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import {Default_Limit} from "../../../services/constant.js";
import {fetchItemsByUserIdAsync} from "../../cart/cartSlice.js"


const sortOptions = [
  { name: 'Price: Low to High', order: 'asc', current: false },
  { name: 'Price: High to Low', order: 'desc', current: false },
]
const subCategories = [
  { name: 'Totes', href: '#' },
  { name: 'Backpacks', href: '#' },
  { name: 'Travel Bags', href: '#' },
  { name: 'Hip Bags', href: '#' },
  { name: 'Laptop Sleeves', href: '#' },
]
const filter = [

  {
    id: 'category',
    name: 'Category',
    options: [],
  },
  {
    id: 'brand',
    name: 'Brand',
    options: [

    ],
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function options(product) {


  let option = Array.from(new Set(product));
  option = option.map((vl) => {
    return {
      value: vl,
      label: vl,
      checked: false
    }
  })
  return option;
}
export default function ProductList() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [filterHandle, setFilterHandle] = useState([]);
  const [page,setPage]=useState(1);
  const user=useSelector((state)=>state.Auth.isLoginUser)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllProductsAsync());
    let category = dataJson.products && dataJson.products.map((vl) => {
      return vl.category
    })
    let brand = dataJson.products && dataJson.products.map((vl) => vl.brand);
    category = options(category);
    brand = options(brand);
    filter[0].options = category;
    filter[1].options = brand;
    console.log(filter[1]);

  }, [])

  useEffect(()=>{
    console.log(user)
       dispatch(fetchItemsByUserIdAsync(user));
     
    

  },[user])

  useEffect(()=>{
    dispatch(fetchProductsByFilterAsync( {filterHandle,page,Default_Limit}));
  },[page,filterHandle])

  useEffect(()=>{
    setPage(1);
  },[filterHandle])


  const product = useSelector((state) => state.Products.product)
  const totalCount=useSelector((state)=>state.Products.totalCount);
  console.log(totalCount)

  const [filters, setFilter] = useState(filter)





function handlePage(page){
  setPage(page);
}

  function handleFilter(filter, index, optionIndx) {
    console.log(filter)
    let id = filter[index].id;
    let value = filter[index].options[optionIndx].value
    const dumpFilterHandle = { ...filterHandle, [id]: value };
    console.log(filter[index].options[optionIndx].checked);
    if (!filter[index].options[optionIndx].checked) {
      delete dumpFilterHandle[id];
    }




    setFilterHandle(dumpFilterHandle);
    dispatch(fetchProductsByFilterAsync(dumpFilterHandle));


  }

  function sortHander(vl) {

    dispatch(sortProductsAsync({ filterHandle, vl }));
  }

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <MobileFilterDilog mobileFiltersOpen={mobileFiltersOpen} setMobileFiltersOpen={setMobileFiltersOpen}
          filters={filters}
          setFilter={setFilter}
        ></MobileFilterDilog>


        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Product</h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option, optionIndx) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              className={classNames(
                                (option.current) ? 'font-medium text-gray-900' : 'text-gray-500',
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm'
                              )}
                              value={option.value}
                              onClick={
                                (e) => {
                                  sortOptions.map((vl) => vl.current = false);
                                  option.current = true;
                                  sortHander(option);

                                }}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>


                {filters.map((section, index) => (
                  <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">{section.name}</span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div key={option.value} className="flex items-center">
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  onChange={(e) => {

                                    filter[index].options[optionIdx].checked = !(filter[index].options[optionIdx].checked);
                                    console.log(filter[index].options[optionIdx].checked)
                                    handleFilter(filter, index, optionIdx);
                                    setFilter(filter);


                                  }}
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3 products-list grid gap-4 sm:grid-cols-2  lg:grid-col-2 xl:grid-cols-3 h-[100%] items-start">

                {
                  product && product.map((data) => {
                    const { id, title, thumbnail, rating, images, category, discountPercentage, stock, price } = data;
                    return (
                      <ProductCard
                        key={id}
                        id={id}
                        title={title}
                        thumbnail={thumbnail}
                        rating={rating}
                        images={images}
                        category={category}
                        discountPercentage={discountPercentage}
                        stock={stock}
                        price={price}
                        data={data}
                      />
                    )
                  })
                }

              </div>
            </div>
          </section>
        </main>
      </div>
      <Pagination 
      totalCount={totalCount}
      page={page} 
      setPage={setPage}
      handlePage={handlePage}
      
      />
    </div>
  )
}



function MobileFilterDilog({ mobileFiltersOpen, setMobileFiltersOpen, filters, setFilter }) {
  return (
    <Transition.Root show={mobileFiltersOpen} as={Fragment}>
      <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                <h3 className="sr-only">Categories</h3>


                {filters.map((section, index) => (
                  <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-mx-2 -my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">{section.name}</span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-6">
                            {section.options.map((option, optionIdx) => (
                              <div key={option.value} className="flex items-center">
                                <input
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"

                                  defaultChecked={option.checked}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  onChange={(e) => {
                                    filter[index].options[optionIdx].checked = !(filter[index].options[optionIdx].checked);
                                    handleFilter(filter[index], filter[index].options[optionIdx]);
                                    setFilter(filter);

                                  }}
                                />
                                <label
                                  htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                  className="ml-3 min-w-0 flex-1 text-gray-500"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

function Pagination({page,setPage,handlePage,totalCount}) {
  const productLength = Math.ceil(totalCount / 10);
  const dumpLength = [...dataJson.products];
  console.log(totalCount)

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          onClick={()=>{
            if(page>1) {
              setPage(page-1);
            }
          }}
          className={`relative ${(page==1)?`hidden`:`inline-flex`} items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50`}
        >
          Previous
        </a>
        <a
          href="#"
          onClick={()=>{
            if(productLength>page) {
            setPage(page +1)
            }
          }}
          className={`${(Default_Limit>productLength)?`hidden`:`inline-flex`} relative ml-3items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50`}
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium"></span> to <span className="font-medium">{(page*10>=totalCount)?(page):(page*10-9)}</span> of {(page*10>=totalCount)?totalCount:page*10}
            <span className="font-medium ml-2">out of {totalCount}</span> results
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <a
              href="#"
              onClick={()=>{
                if(page>1) {
                  setPage(page-1);
                }
              }}
              className={`relative ${(page==1)?`hidden`:`inline-flex`}  items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}


            {
              dumpLength.splice(0, productLength).map((_, index) => {
                return (<a
                  href="#"
                  aria-current="page"
                  key={index + 1}
                  onClick={()=>handlePage(index+1)}
                  className={`relative z-10 inline-flex items-center ${(index+1===page)?`bg-indigo-600 text-white`:`text-indigo-600 bg-white`} px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                >
                  {index + 1}
                </a>)
              })

            }

            <a
              href="#"
              className={`relative ${(Default_Limit>productLength || page==Default_Limit)?`hidden`:`inline-flex`} items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
              onClick={()=>{
                if(productLength>page) {
                setPage(page +1)
                }
              }}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  )
}
