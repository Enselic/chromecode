module SetOfSkills
  class PreCalculations < Jekyll::Generator
    def generate(site)
    	tags_ordered_by_count = []
    	site.tags.each do |tag, posts| {}
    		tags_ordered_by_count << [ tag, posts.size ]
    	end
    	tags_ordered_by_count.sort_by! { |entry| entry[1] }
    	site.data['tags_ordered_by_count'] = tags_ordered_by_count.reverse
    end
  end
end
