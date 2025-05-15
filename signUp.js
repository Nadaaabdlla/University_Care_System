window.addEventListener("load", () => {
    const formTypeBtn1 = document.querySelector("#formTypeContainer button:first-child");
    const formTypeBtn2 = document.querySelector("#formTypeContainer button:last-child");
    const drId = document.getElementById("drId");

    formTypeBtn1.addEventListener("click", (e) => {
        e.preventDefault();
        drId.classList.remove("hidden");
        formTypeBtn2.classList.remove("hover");
        formTypeBtn1.classList.add("hover");
    });

    formTypeBtn2.addEventListener("click", (e) => {
        e.preventDefault();
        drId.classList.add("hidden");
        formTypeBtn1.classList.remove("hover");
        formTypeBtn2.classList.add("hover");
    });
});
