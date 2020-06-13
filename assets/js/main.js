const $ = document;

$.addEventListener("DOMContentLoaded", () => {
    const modal = $.querySelector(".modal");
    const body = $.querySelector("body");

    $.querySelector(".btn-signup").addEventListener("click", () => {

        modal.classList.remove("hidden");

        body.classList.add("disable");
    });
    $.querySelector(".icon-times").addEventListener("click", () => {

        modal.classList.add("hidden");

        body.classList.remove("disable");
    });


    $.querySelector(".btn-text-down").addEventListener("click", () => {
        $.querySelector(".text").classList.toggle("overflow-hidden");
        $.querySelector(".btn-text-down").classList.toggle("hidden");
        $.querySelector(".btn-text-up").classList.toggle("hidden");
    });


    $.querySelector(".btn-text-up").addEventListener("click", () => {
        $.querySelector(".text").classList.toggle("overflow-hidden");
        $.querySelector(".btn-text-up").classList.toggle("hidden");
        $.querySelector(".btn-text-down").classList.toggle("hidden");
    });
});