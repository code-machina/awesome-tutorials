<template>
    <h1> A single user, with ID : {{ $route.params.id}}</h1>
</template>

<script>
    export default {
        validate(data) {
            // console.log(data);
            // return data.params.id == 1;
            // Regex Expression
            return /^\d+$/.test(data.params.id);
        },
        layout: 'users',
    }
</script>
