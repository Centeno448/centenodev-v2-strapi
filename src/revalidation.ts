const NEXTJS_BASE_URL = process.env.NEXTJS_BASE_URL;
const NEXTJS_REVALIDATION_TOKEN = process.env.NEXTJS_REVALIDATION_TOKEN;

export async function triggerProjectRevalidation() {
    try {
        strapi.log.info("Triggering Nextjs project revalidation");
        await fetch(`${NEXTJS_BASE_URL}/revalidation`, {
            method: "POST",
            headers: {
                authorization: `Bearer ${NEXTJS_REVALIDATION_TOKEN}`
            },
            body: JSON.stringify({ tag: "projects" })
        });
    } catch (error) {
        strapi.log.error(`Failed to trigger project revalidation with error ${error}`);
    }
}
