module SetOfSkills
  class PreCalculations < Jekyll::Generator
    def generate(site)
    	tag_counts = []
    	site.tags.each_key do |tagName|
    		tag_counts << [ tagName, site.tags[tagName].size, site.tags[tagName] ]
    	end
    	tag_counts.sort_by! { |entry| entry[1] }
    	site.data['tag_counts'] = tag_counts.reverse
    end
  end
end
