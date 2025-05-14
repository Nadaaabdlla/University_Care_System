window.addEventListener("load", () => {
    document.getElementById("formTypeBtn1").addEventListener("click", () => {
        document.getElementById("drId").classList.remove("hidden");
        document.getElementById("formTypeBtn2").classList.remove("hover");
        document.getElementById("formTypeBtn1").classList.add("hover");
        document.getElementById("formTypeBtn1").addEventListener("click", function (click) {
            click.preventDefault();
        });
    });
    document.getElementById("formTypeBtn2").addEventListener("click", () => {
        document.getElementById("drId").classList.add("hidden");
        document.getElementById("formTypeBtn1").classList.remove("hover");
        document.getElementById("formTypeBtn2").classList.add("hover");
        document.getElementById("formTypeBtn2").addEventListener("click", function (click) {
            click.preventDefault();
        });
    });
})