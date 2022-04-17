<template>
    <ul class="catalog__pagination pagination">
          <li class="pagination__item">
            <a class="pagination__link pagination__link--arrow" aria-label="Предыдущая страница"
                :class="{'pagination__link--disabled' : page == 1}"
                @click.prevent="paginate(Math.max(page - 1, 1))"
            >
              <svg width="8" height="14" fill="currentColor">
                <use xlink:href="#icon-arrow-left"></use>
              </svg>
            </a>
          </li>
          <li class="pagination__item"
            v-for="pageNumber in pagesCount"
            :key="pageNumber"
          >
            <a href="#" class="pagination__link"
                :class="{'pagination__link--current' : pageNumber === page}"
                @click.prevent="paginate(pageNumber)"
            >
              {{ pageNumber }}
            </a>
          </li>
          <li class="pagination__item">
            <a class="pagination__link pagination__link--arrow" href="#" aria-label="Следующая страница"
                :class="{'pagination__link--disabled' : page == pagesCount}"
                @click.prevent="paginate(Math.min(page + 1, pagesCount))"
            >
              <svg width="8" height="14" fill="currentColor">
                <use xlink:href="#icon-arrow-right"></use>
              </svg>
            </a>
          </li>
        </ul>
</template>

<script>
export default {
    model: {
        prop: "page",
        event: "paginate"
    },
    props: ["page", "count", "perPage"],
    methods: {
        paginate(nextPage) {
            if(nextPage != this.page) {
                this.$emit("paginate", nextPage);
            }
        }
    },
    computed: {
        pagesCount() {
            return Math.ceil(this.count / this.perPage);
        }
    }
}
</script>