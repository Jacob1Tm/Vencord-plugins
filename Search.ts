/*
 * Vencord, a modification for Discord's desktop app
 * Copyright (c) 2023 Vendicated and contributors
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import {ApplicationCommandOptionType} from "@api/Commands";
import { Devs } from "@utils/constants";
import definePlugin from "@utils/types";

export default definePlugin({
    name: "Search",
    authors: [Devs.JacobTm],
    description: "Generates search links for various search engines.",
    dependencies: ["CommandsAPI"],
    commands: [{
        name: "search",
        description: "Generates search link for selected engine.",
        options: [
            {
                type: ApplicationCommandOptionType.STRING,
                name: "Search query",
                description: "What do you want to search?",
                required: true
            },
            {
                type: ApplicationCommandOptionType.STRING,
                name: "Search engine",
                description: "Which search engine do you want to use?",
                required: true,
                choices: [
                    { name: "Google", value: "google.com", label: "Google search engine" },
                    { name: "Bing", value: "bing.com", label: "Bing search engine" },
                    { name: "DuckDuckGo", value: "duckduckgo.com", label: "DuckDuckGo private search engine" },
                    { name: "searX", value: "searx.thegpm.org", label: "searX private search engine" },
                    { name: "StartPage", value: "startpage.com", label: "StartPage private search engine" },
                    //why i added this? idk
                    { name: "Yandex", value: "yandex.com", label: "Yandex search engine" },
                    //there should be a way to add custom search engines, but it fucks up everything
                    //more maybe added in the future
                ],
            }
        ],
        execute(args) {
            const query = args[0].value.replace(" ", "+");
            //cause google is weird
            switch (args[1].value) {
                case "google.com":
                    const link = "https://google.com/search?q=" + query;
                    return {
                        content: link
                    }
                default: {
                    const link = "https://" + args[1].value + "/?q=" + query;
                    return {
                        content: link
                    };
                }
            }
        }
    }],
});
