import eventBus from "@/eventBus";

export default function(page, params) {
    eventBus.$emit("goToPage", page, params);
};