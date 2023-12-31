export default async function fetchThemes() {
    const themeApiUrl = "https://raw.githubusercontent.com/brijeshb42/monaco-themes/master/themes/themelist.json";

    try {
        const res = await fetch(themeApiUrl);
        const json = await res.json();

        return Object.values(json);
    } catch (e) {
        console.error('Failed to fetch theme list!', e);
    }
}