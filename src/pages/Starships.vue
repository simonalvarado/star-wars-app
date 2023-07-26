<template>
    <div>
        <ul>
        <li v-for="ship in ships" :key="ship.id">
            <router-link :to="{ name: 'ship-detail', params: { id: ship.id } }">
            {{ ship.name }}
            </router-link>
        </li>
        </ul>
    </div>
</template>
