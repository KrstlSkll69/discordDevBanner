/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import definePlugin from "@utils/types";

const names: Record<string, string> = {
    stable: "Stable",
    ptb: "PTB",
    canary: "Canary",
    staging: "Staging"
};

export default definePlugin({
    name: "devBanner",
    description: "Enables the Discord dev banner, which shows the build ID",
    authors: [
        { name: "krystalskullofficial", id: 929208515883569182n },
    ],

    patches: [
        {
            find: ".devBanner,",
            replacement: [{
                match: '"staging"===window.GLOBAL_ENV.RELEASE_CHANNEL',
                replace: "true"
            },
            {
                match: /.\.intl\.format\(.+?,{buildNumber:(.+?)}\)/,
                replace: (_, buildNumber) => `$self.transform(${buildNumber})`
            }]
        }
    ],

    transform(buildNumber: string) {
        const releaseChannel: string = window.GLOBAL_ENV.RELEASE_CHANNEL;

        if (names[releaseChannel]) {
            return `${names[releaseChannel]} ${buildNumber}`;
        } else {
            return `${releaseChannel.charAt(0).toUpperCase() + releaseChannel.slice(1)} ${buildNumber}`;
        }
    }
});
