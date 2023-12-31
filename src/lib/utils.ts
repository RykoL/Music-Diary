import {browser} from "$app/environment";

export const formatDateString = (dateString: string): string => {
    const locale = browser ? navigator.language : "en-us"
    return new Intl.DateTimeFormat(locale).format(new Date(dateString))
}