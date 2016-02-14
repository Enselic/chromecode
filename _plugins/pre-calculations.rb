require 'date'

module SetOfSkills
    class PreCalculations < Jekyll::Generator
        def generate(site)
            generate_tags_ordered_by_count site
            generate_posts_by_year site
        end

        def generate_tags_ordered_by_count(site)
        	tags_ordered_by_count = []
        	site.tags.each do |tag, posts| {}
        		tags_ordered_by_count << [ tag, posts.size ]
        	end
        	tags_ordered_by_count.sort_by! { |entry| entry[1] }
        	site.data['tags_ordered_by_count'] = tags_ordered_by_count.reverse
        end

        def generate_posts_by_year(site)
            h = Hash.new { |hash, key| hash[key] = [] }
            site.posts.docs.each do |post|
                h[post.date.year] << post
            end
            years = h.map { |year,posts| [year.to_s, posts.size, posts] }
            years.sort_by! { |entry| entry[0] }
            site.data['posts_by_year'] = years.reverse
        end
    end

    module Filters
        # Adds a 2x3 transparent png data uri to any img tag.
        # For use with img lazy-loading
        def add_data_uri_to_img(input)
            input.gsub '<img', '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAACCAYAAACddGYaAAAAC0lEQVQI12NgwAUAABoAASRETuUAAAAASUVORK5CYII="'
        end
    end
end

Liquid::Template.register_filter(SetOfSkills::Filters)
