<template>
    <div class="text-xs-center custom-border">
        This is Dumb Component, which is for testing
    </div>
</template>

<script>
export default {
    data: function() {
        return {
        }
    }
}
</script>

<style scoped>
.custom-border {
    border-style: solid;
    border-width: 1px;
    height: 150px;
    width: 200px;
}

.custom-border:hover {
    background-color: yellow;
}

.custom-border:active {
    background-color: red;
}
</style>
