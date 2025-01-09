import type { Core } from '@strapi/strapi';
import { triggerNextRevalidation, getSlugFromDeletedProject } from "./revalidation";

const applyTo = ['api::project.project', 'api::homepage.homepage'];

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }: { strapi: Core.Strapi }) {
    strapi.documents.use(async (context, next) => {
      if (!applyTo.includes(context.uid)) {
        return next();
      }

      // Only run for certain actions
      if (['create', 'update', 'delete'].includes(context.action)) {
        switch (context.uid) {
          case "api::project.project":
            let slug: string = "";

            switch (context.action) {
              case "delete":
                slug = await getSlugFromDeletedProject(context.params.documentId);
                break;
              case "create":
              case "update":
                slug = context.params.data.slug;
                break;
              default:
                break;
            }

            if (slug) {
              try {
                const path = `/projects/${slug}`;
                await triggerNextRevalidation(path, "projects");
              }
              catch (error) {
                strapi.log.error(`Failed to trigger project revalidation with error ${error}`);
              }
            }
            else {
              strapi.log.warn(`Failed to trigger project revalidation for action ${context.action}. Slug not set`);
            }

            break;

          case "api::homepage.homepage":
            try {
              await triggerNextRevalidation("/");
            }
            catch (error) {
              strapi.log.error(`Failed to trigger homepage revalidation with error ${error}`);
            }
            break;
          default:
            break;
        }

      }

      return next();
    });
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/* { strapi }: { strapi: Core.Strapi } */) { },
};
