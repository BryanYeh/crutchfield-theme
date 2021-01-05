import '../layout/theme.js'
import {AddressForm} from '@shopify/theme-addresses'

const addressForms = document.querySelectorAll('[data-address=root]')
addressForms.forEach(function(form){
    AddressForm(form, 'en')
})

document.querySelector('.add-address').addEventListener('click', (e) => {
    document.querySelector(".address").classList.remove('hidden');
    document.querySelector('.add-address').classList.add('hidden');
    document.querySelector('.address-edit-form').classList.add('hidden')
})

document.querySelectorAll('.address-edit').forEach(function(edit_button){
    edit_button.addEventListener('click', (e) => {
        let address_form = document.querySelector('.address-edit-form')
        address_form.querySelector("[name='address[first_name]']").value = edit_button.dataset.firstName
        address_form.querySelector("[name='address[last_name]']").value = edit_button.dataset.lastName
        address_form.querySelector("[name='address[company]']").value = edit_button.dataset.company
        address_form.querySelector("[name='address[address1]']").value = edit_button.dataset.address1
        address_form.querySelector("[name='address[address2]']").value = edit_button.dataset.address2
        address_form.querySelector("[name='address[city]']").value = edit_button.dataset.city
        address_form.querySelector("[name='address[country]']").dataset.default = edit_button.dataset.country
        address_form.querySelector("[name='address[province]']").dataset.default = edit_button.dataset.province
        address_form.querySelector("[name='address[zip]']").value = edit_button.dataset.zip
        address_form.querySelector("[name='address[phone]']").value = edit_button.dataset.phone
        address_form.querySelector("[name='address[default]']").checked = edit_button.dataset.default === "1"
        address_form.action = "/account/address/" + edit_button.dataset.addressId
        address_form.classList.remove('hidden')

        document.querySelector(".address").classList.add('hidden');
        document.querySelector('.add-address').classList.remove('hidden');
    })
})

