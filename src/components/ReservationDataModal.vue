<template>
    <div class="modal" v-if="isOpen">
        <div class="modal-content">
            <h2 class="modal-content-item modal-content-name">{{ message.name }}</h2>
            <p class="modal-content-item">{{ message.phone }}</p>
            <p class="modal-content-item">{{ message.email }}</p>
            <p class="modal-content-item modal-content-typeOfApartments">{{ message.typeOfApartments }}</p>
            <p class="modal-content-item modal-content-number-guests">Number of Guests </p>
            <p class="modal-content-item">Adults: {{ message.guestInfo.adults }}</p>
            <p class="modal-content-item">Children: {{ message.guestInfo.children }}</p>
            <p class="modal-content-item">{{ message.start }} - {{ message.end }}</p>
            <div class="modal-close-container">
                <button class="modal-close" @click="closeModal">Close</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ['isOpen', 'message'],
  methods: {
    closeModal () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.modal {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: -30px;
    left: 60px;
    background-color: #fff;
    border-radius: 10px;
    -webkit-box-shadow: 2px 3px 16px -2px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 2px 3px 16px -2px rgba(0, 0, 0, 0.75);
    box-shadow: 2px 3px 16px -2px rgba(0, 0, 0, 0.75);
    z-index: 999;
}

.modal-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    min-width: 180px;
    min-height: 250px;
    padding: 10px 0;
    border-radius: 5px;
    color: black;
    background-color: white;
}

.modal-content-item {
    font-size: 14px;
    margin: 2px 10px;
}

.modal-content-name {
    font-size: 20px;
    font-weight: 800;
    text-align: start;
    margin-bottom: 0;
}

.modal-content-typeOfApartments {
    margin-top: 15px;
}

.modal-content-number-guests {
    font-size: 16px;
    font-weight: 700;
}

.modal-close-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-top: 1px solid #d6d5d5;
    padding-left: 10px;
    padding-top: 15px;
    margin-top: 10px;
    margin-bottom: 10px;
    width: 100%;
}

.modal-close {
    background-color: rgb(1, 1, 87);
    color: #fff;
    padding: 5px;
    border-radius: 5px;
}</style>
