<template>
    <div class="text-xs-center custom-border">
        This is Dumb Component, which is for testing
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            paragraph: "Hellworld",
        }
    }
}
</script>

<style scoped>
.custom-border {
    border-style: solid;
    border-width: 1px;
}
</style>
