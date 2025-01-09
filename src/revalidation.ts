const NEXTJS_BASE_URL = process.env.NEXTJS_BASE_URL;
const NEXTJS_REVALIDATION_TOKEN = process.env.NEXTJS_REVALIDATION_TOKEN;

export async function triggerNextRevalidation(path: string, tag?: string) {
    strapi.log.info(`Triggering Nextjs revalidation for path ${path} ${tag ? `and tag ${tag}` : ""}`);
    await fetch(`${NEXTJS_BASE_URL}/revalidation`, {
        method: "POST",
        headers: {
            authorization: `Bearer ${NEXTJS_REVALIDATION_TOKEN}`
        },
        body: JSON.stringify({ path, tag })
    });
}

export async function getSlugFromDeletedProject(documentId: string): Promise<string> {
    const res = await strapi.db.query('api::project.project').findOne({
        select: ['slug'],
        where: { documentId }
    });

    return res.slug;
}
