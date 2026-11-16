const calculateHeight = (element: HTMLElement, gap: number = 10) => {
    const top = element.getBoundingClientRect().top;

    let parent = element.parentElement;

    while (parent) {
        const overflow = window.getComputedStyle(parent).overflowY;

        if (overflow === "auto" || overflow === "scroll") {
            return Math.max(
                0,
                parent.getBoundingClientRect().bottom - top - gap
            );
        }

        parent = parent.parentElement;
    }

    return Math.max(0, window.innerHeight - top - gap);
};

export default calculateHeight;