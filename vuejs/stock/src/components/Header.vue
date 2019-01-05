<template>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <button class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo01"
        aria-controls="navbarTogglerDemo01"
        aria-expanded="false"
        aria-haspopup="true"
        aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
    <router-link to="/" class="navbar-brand" tag="a">Stock Trader</router-link>
    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
      <li class="nav-item active">
        <router-link
            class="nav-link active"
            to="/portfolio"
            href="#"
            activeClass="active">
                Portfolio <span class="sr-only">(current)</span>
        </router-link>
      </li>
      <li class="nav-item active">
        <router-link
            class="nav-link active"
            to="/stocks"
            href="#"
            activeClass="active">
                Stocks
        </router-link>
      </li>
      <li clas="nav-item active navbar-text navbar-right">
          <div>
            Funds: {{ fund }}
          </div>
         
      </li>
      
        <li class="nav-item dropdown navbar-right"
            :class="{show: isDropdownOpen}"
            @click.prevent="isDropdownOpen = !isDropdownOpen">
        <a class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdownMenuLink"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false">
            Save & Load & End Day
        </a>
        <div class="dropdown-menu"  


            aria-labelledby="navbarDropdownMenuLink">
            <a class="dropdown-item" href="#" @click="saveData">Save Data</a>
            <a class="dropdown-item" href="#" @click="loadData">Load Data</a>
            <a class="dropdown-item" href="#" @click="endDay">End Day</a>
        </div>
        </li>
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>
</nav>
</template>


<script>
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            isDropdownOpen: false,
        };
    },
    computed: {
        fund() {
            return this.$store.getters.funds;
        }
    },
    methods : {
        endDay() {
            this.randomizeStocks();
        },
        ...mapActions([
            'randomizeStocks',
            'loadData'
        ]),
        saveData() {
            const data = {
                funds : this.$store.getters.funds,
                stockPortfolio : this.$store.getters.stockPortfolio,
                stocks: this.$store.getters.stocks,
            };
            this.$http.put('data.json', data);
        },
    },
}
</script>
