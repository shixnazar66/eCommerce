class Pagination {
  constructor(page = 1,paginationLimit = 15,totalitems = 0) {
    this.limit = +paginationLimit
    this.offset = ((+page)-1) * this.limit
    this.currentPage = +page
    this.totalitems = totalitems
    this.totalPages = Math.ceil(totalitems/paginationLimit)
  }
}


module.exports = Pagination;